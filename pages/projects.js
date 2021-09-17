import Head from "next/head"
import Link from "next/link"
import Layout from "@/components/Layout"
export default function PageProjects({ repos }) {
	return (
		<Layout withHero={{ title: "My Projects", subtitle: "My projects repos at Github" }}>
			<Head>
				<title>My Project</title>
			</Head>
			<div className="block text-center">
				{repos.map((repo, index) => (
					<div key={index} className="py-4">
						<a
							href={repo.html_url}
							target="__blank">
							<h3>{repo.name}</h3>
						</a>
						<span>{repo.description}</span>
					</div>
				))}
			</div>
		</Layout>
	)
}

export async function getStaticProps() {
	const data = await fetch("https://api.github.com/users/arisris/repos?sort=created")
	let repos = await data.json()
	repos = repos.map((i) => {
		return {
			name: i.name,
			html_url: i.html_url,
			description: i.description,
		}
	})
	return {
		props: {
			repos,
		},
	}
}
