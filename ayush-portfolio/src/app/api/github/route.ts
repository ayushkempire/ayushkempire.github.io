const GITHUB_USER = "ayushkempire";

type Repo = {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return Response.json({ error: "GitHub unavailable" }, { status: 502 });
    }

    const user = await userRes.json();
    const repos: Repo[] = await reposRes.json();

    const own = repos.filter((repo) => !repo.fork);
    const stars = own.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    const languageCounts = new Map<string, number>();
    for (const repo of own) {
      if (repo.language) {
        languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
      }
    }
    const topLanguages = [...languageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([language]) => language);

    return Response.json({
      repos: user.public_repos,
      followers: user.followers,
      stars,
      topLanguages,
    });
  } catch {
    return Response.json({ error: "GitHub unavailable" }, { status: 502 });
  }
}
