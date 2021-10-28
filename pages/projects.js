import Link from 'next/link';
import Layout from '@/components/Layout';
export default function PageProjects({ repos }) {
	return (
		<Layout
			title="My Projects"
			withHero={{
				title: 'My Projects',
				subtitle: (
					<div>
						My repositories at{' '}
						<a target="__blank" href="https://github.com/arisris">https://github.com/arisris</a>
					</div>
				)
			}}
		>
			<div className="px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
				{repos.map((repo, index) => (
					<div
						key={index}
						className="p-4 border border-gray-200 dark:border-gray-900 rounded"
					>
						<a
							className="text-blue-700 dark:text-blue-400"
							href={repo.html_url}
							target="__blank"
						>
							<h3 className="text-md">{repo.name}</h3>
							<div className="text-[10px] text-gray-500">{repo.html_url}</div>
						</a>
						<div className="text-sm">{repo.description}</div>
					</div>
				))}
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const data = await fetch(
		'https://api.github.com/users/arisris/repos?sort=created'
	);
	let repos = await data.json();
	repos = repos.map((i) => {
		return {
			name: i.name,
			html_url: i.html_url,
			description: i.description
		};
	});
	return {
		props: {
			repos
		}
	};
}
