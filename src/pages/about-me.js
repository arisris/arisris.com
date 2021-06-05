import Head from "next/head"
import Layout from "@/components/Layout"
import { DesktopComputerIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/solid"
export default function PageAboutMe() {
	return (
		<Layout>
			<Head>
				<title>About Me</title>
			</Head>
			<div className="block my-16 text-purple-900">
				<h1 className="text-4xl font-black mb-10 text-purple-700">About Me</h1>
				<p className="mb-10 text-xl font-bold">
					Hello, My name is <span className="underline">Aris Riswanto</span>, and i'm a fullstack
					web developer from indonesia that love web programing since 2009
				</p>
				<p className="mb-10">
					I am a father of one kids, I started learning programming languages since{" "}
					<span className="underline">2009</span>. Actually I don't have an IT education background
					but I was very enthusiastic about learning programming languages from that time until now. I was born 30 years ago in Majalengka, And now I live with my family in Ciamis.
				</p>
				{/* Comments */}
				<h3 className="text-xl font-bold py-4 32xl text-purple-700">About:</h3>
				<p className="mb-10">
					<ul>
						{[
							[<DesktopComputerIcon />, "Works fulltime as a fullstack web developer"],
							[<HomeIcon />, "Work From Home"],
							[<UserGroupIcon />, "Was married and having one children"],
						].map((i) => (
							<li className="flex items-center italic font-bold text-sm m-1 p-1">
								<div className="w-6 h-6">{i[0]}</div> <span>&nbsp;{i[1]}</span>
							</li>
						))}
					</ul>
				</p>
				<p className="mb-10">
					<h3 className="text-xl font-bold pb-4 text-purple-700">Knowledgebase:</h3>
					<p>Below are some of my favorite stacks that I have used.</p>
					{/* Comments */}
					<h3 className="text-md font-bold py-4 32xl text-purple-700">Education:</h3>
					<p>
						---
					</p>
					{/* Comments */}
					<h3 className="text-md font-bold py-4 32xl text-purple-700">Languages:</h3>
					<p>
						{["PHP", "Node.js", "Javascript", "HTML5", "CSS"].map((i) => (
							<span className="italic font-bold text-sm m-1 p-1 border rounded">{i}</span>
						))}
					</p>
					{/* Comments */}
					<h3 className="text-md font-bold py-4 32xl text-purple-700">Frontend:</h3>
					<p>
						{["React", "Mithril.js", "Bulma", "Tailwind", "Next.js", "Storeon"].map((i) => (
							<span className="italic font-bold text-sm m-1 p-1 border rounded">{i}</span>
						))}
					</p>
					{/* Comments */}
					<h3 className="text-md font-bold py-4 32xl text-purple-700">Backend:</h3>
					<p>
						{[
							"Basic MySQL",
							"Basic MongoDB",
							"Laravel",
							"Codeigniter",
							"Express.js",
							"Total.js",
						].map((i) => (
							<span className="italic font-bold text-sm m-1 p-1 border rounded">{i}</span>
						))}
					</p>
					{/* Comments */}
					<h3 className="text-md font-bold py-4 32xl text-purple-700">Infrastructure:</h3>
					<p>
						{[
							"Vercel",
							"Netlify",
							"CPanel",
							"VestaCP",
							"Firebase",
							"Or Any Cloud Server Stuff..",
						].map((i) => (
							<span className="italic font-bold text-sm m-1 p-1 border rounded">{i}</span>
						))}
					</p>
				</p>
			</div>
		</Layout>
	)
}
