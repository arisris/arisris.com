import Head from "next/head"
import Image from "next/image"
import Layout from "@/components/Layout"
import { DesktopComputerIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/solid"
import { TypedText } from "@/components/TypedText"

const Tags = ({ data }) => (
	<div className="inline-flex flex-wrap">
		{data.map((i, index) => (
			<span className="px-2 py-[1px] ring-1 ring-purple-800 dark:ring-gray-800 dark:text-gray-300 rounded mr-2 mb-2" key={index}>
				{i}
			</span>
		))}
	</div>
)

export default function PageAboutMe() {
	return (
		<Layout>
			<Head>
				<title>About Me</title>
			</Head>
			<div className="flex flex-col justify-center items-center my-16">
				<h1 className="pt-10">About Me</h1>
				<div className="mb-10 relative">
					<Image
						width="200"
            height="200"
						alt="arisris"
						className="ring-4 ring-purple-800 dark:ring-gray-800 rounded-full"
						src="https://avatars.githubusercontent.com/u/62107426?v=4"
					/>
					<div className="flex justify-start absolute bottom-2 left-10 bg-gray-400 rounded-2xl opacity-50">
						<a title="Github" className="flex items-center p-2" href="https://github.com/arisris">
							<Image
								alt="Github"
								src="https://icongr.am/devicon/github-original.svg"
								width="24"
								height="24"
							/>
						</a>
						<a
							title="Facebook"
							className="flex items-center p-2"
							href="https://facebook.com/arisfungratis">
							<Image
								alt="Facebook"
								src="https://icongr.am/devicon/facebook-original.svg"
								width="24"
								height="24"
							/>
						</a>
						<a
							title="LinkedIn"
							className="flex items-center p-2"
							href="https://linkedin.com/in/sksnetid">
							<Image
								alt="LinkedIn"
								src="https://icongr.am/devicon/linkedin-original.svg"
								width="24"
								height="24"
							/>
						</a>
					</div>
				</div>
				<div className="mb-10 text-center text-xl font-bold">
					Hello, My name is <span className="underline">Aris Riswanto</span>
					<br /> And i'm a <br />
					<TypedText
						className="inline-block dark:text-blue-500"
						options={{
							strings: [
								"Fullstack Web developer",
								"React Developer",
								"Next.js Developer",
								"Nodejs Developer",
								"PHP Developer",
								"Laravel Developer",
								"Web Scraper"
							],
						}}
					/>
					<br />I love web programing since 2009
				</div>
				<div className="mb-10 text-center">
					I am a father of one kids, I started learning programming languages since{" "}
					<span className="underline">2009</span>. Actually I don't have an IT education background
					but I was very enthusiastic about learning programming languages from that time until now.
					I was born 30 years ago in Majalengka, And now I live with my family in Ciamis. I have no
					experience working in other companies. But if you intend to hire me please contact me
				</div>
				{/* Comments */}
				<h2>About</h2>
				<div className="mb-10">
					<div>
						{[
							[<DesktopComputerIcon />, "Works fulltime as a fullstack web developer"],
							[<HomeIcon />, "Work From Home"],
							[<UserGroupIcon />, "Was married and having one children"],
							[<DesktopComputerIcon />, "Coding with linux"],
						].map((i, index) => (
							<div key={index} className="flex items-center italic font-bold text-sm m-1 p-1">
								<div className="w-6 h-6">{i[0]}</div> <span>&nbsp;{i[1]}</span>
							</div>
						))}
					</div>
				</div>
				<div className="mb-10">
					<h3>Knowledgebase:</h3>
					<p>
						I'm Experience with{" "}
						<strong>
							"Cloud Server, Progressive Web App, Jamstack site, Rest Api, Web Scraper / Data
							Mining"
						</strong>{" "}
						technology
					</p>
					{/* Comments */}
					<h3>Backend experience:</h3>
					{<Tags data={["Node", "PHP", "SQL", "NoSQL", "?"]} />}
					{/* Comments */}
					<h3>Backend framework:</h3>
					{<Tags data={["Laravel", "CI", "Totaljs", "Express", "Apify", "Crawler.js", "?"]} />}
					<h3>Frontend framework:</h3>
					{<Tags data={["React", "Next", "jQuery", "Tailwind", "Bootstrap", "?"]} />}
					{/* Comments */}
					<h3>Infrastructure such as:</h3>
					{
						<Tags
							data={[
								"AWS",
								"Google Cloud",
								"Vercel",
								"Netlify",
								"Cloudflare",
								"Firebase",
								"Planetscale",
								"?",
							]}
						/>
					}
				</div>
			</div>
		</Layout>
	)
}
