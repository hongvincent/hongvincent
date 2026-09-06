#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from textwrap import dedent

START_MARKER = "<!-- profile-metrics:start -->"
END_MARKER = "<!-- profile-metrics:end -->"

QUERY = dedent(
    """
    query($from: DateTime!, $to: DateTime!) {
      viewer {
        login
        name
        publicRepos: repositories(ownerAffiliations: OWNER, privacy: PUBLIC, isFork: false) {
          totalCount
        }
        privateRepos: repositories(ownerAffiliations: OWNER, privacy: PRIVATE, isFork: false) {
          totalCount
        }
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
          }
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalRepositoriesWithContributedCommits
          hasAnyRestrictedContributions
          restrictedContributionsCount
        }
      }
    }
    """
).strip()


def run_github_query(query: str, *, from_date: str, to_date: str) -> dict:
    cmd = [
        "gh",
        "api",
        "graphql",
        "-f",
        f"query={query}",
        "-F",
        f"from={from_date}",
        "-F",
        f"to={to_date}",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "GitHub GraphQL query failed")
    payload = json.loads(result.stdout)
    return payload["data"]["viewer"]


def build_metrics(viewer: dict, *, from_date: str, to_date: str, generated_at: str) -> dict:
    contributions = viewer["contributionsCollection"]
    return {
        "generated_at": generated_at,
        "period": {
            "from": from_date,
            "to": to_date,
        },
        "viewer": {
            "login": viewer["login"],
            "name": viewer["name"],
        },
        "repository_counts": {
            "public_owned_non_fork": viewer["publicRepos"]["totalCount"],
            "private_owned_non_fork": viewer["privateRepos"]["totalCount"],
        },
        "contributions_last_12_months": {
            "total": contributions["contributionCalendar"]["totalContributions"],
            "commits": contributions["totalCommitContributions"],
            "issues": contributions["totalIssueContributions"],
            "pull_requests": contributions["totalPullRequestContributions"],
            "pull_request_reviews": contributions["totalPullRequestReviewContributions"],
            "repositories_with_commit_contributions": contributions["totalRepositoriesWithContributedCommits"],
            "has_restricted_contributions": contributions["hasAnyRestrictedContributions"],
            "restricted_contributions_count": contributions["restrictedContributionsCount"],
        },
    }


def render_metrics_block(metrics: dict, lang: str = "en") -> str:
    contrib = metrics["contributions_last_12_months"]
    repo_counts = metrics["repository_counts"]
    restricted = contrib["has_restricted_contributions"] and contrib["restricted_contributions_count"] > 0
    if lang == "ko":
        lines = [
            f"- 최종 업데이트: {metrics['generated_at'][:10]}",
            f"- 최근 12개월 기여 {contrib['total']:,}건",
            (
                f"- {contrib['repositories_with_commit_contributions']:,}개 레포에 걸쳐 "
                f"pull request 기여 {contrib['pull_requests']:,}건, 커밋 기여 {contrib['commits']:,}건"
            ),
            (
                f"- 소유 공개 레포 {repo_counts['public_owned_non_fork']:,}개, "
                f"소유 비공개 레포 {repo_counts['private_owned_non_fork']:,}개 (포크 제외)"
            ),
        ]
        if restricted:
            lines.append("- 비공개·사내 작업이 최근 기여량의 대부분")
        return "\n".join(lines)
    lines = [
        f"- Last updated: {metrics['generated_at'][:10]}",
        f"- {contrib['total']:,} contributions in the last 12 months",
        (
            f"- {contrib['pull_requests']:,} pull request contributions and "
            f"{contrib['commits']:,} commit contributions across "
            f"{contrib['repositories_with_commit_contributions']:,} repositories"
        ),
        (
            f"- {repo_counts['public_owned_non_fork']:,} owned public repositories and "
            f"{repo_counts['private_owned_non_fork']:,} owned private repositories "
            "(excluding forks)"
        ),
    ]
    if restricted:
        lines.append("- Private and internal work represent most of the recent contribution volume")
    return "\n".join(lines)


def update_readme(readme_path: Path, metrics_block: str) -> None:
    content = readme_path.read_text(encoding="utf-8")
    pattern = re.compile(
        rf"{re.escape(START_MARKER)}.*?{re.escape(END_MARKER)}",
        re.DOTALL,
    )
    replacement = f"{START_MARKER}\n{metrics_block}\n{END_MARKER}"
    updated, count = pattern.subn(replacement, content)
    if count != 1:
        raise RuntimeError(f"Could not find profile metrics markers in {readme_path.name}")
    readme_path.write_text(updated, encoding="utf-8")


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    readme_path = repo_root / "README.md"
    readme_ko_path = repo_root / "README_KO.md"
    data_dir = repo_root / "data"
    metrics_path = data_dir / "profile-metrics.json"

    now = datetime.now(timezone.utc)
    start = now - timedelta(days=365)
    from_date = start.replace(microsecond=0).isoformat().replace("+00:00", "Z")
    to_date = now.replace(microsecond=0).isoformat().replace("+00:00", "Z")
    generated_at = now.replace(microsecond=0).isoformat().replace("+00:00", "Z")

    viewer = run_github_query(QUERY, from_date=from_date, to_date=to_date)
    metrics = build_metrics(viewer, from_date=from_date, to_date=to_date, generated_at=generated_at)

    data_dir.mkdir(exist_ok=True)
    metrics_path.write_text(json.dumps(metrics, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    update_readme(readme_path, render_metrics_block(metrics, "en"))
    if readme_ko_path.exists():
        update_readme(readme_ko_path, render_metrics_block(metrics, "ko"))

    print(f"Updated {metrics_path.relative_to(repo_root)}, README.md, and README_KO.md")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
