import Link from "next/link"

export default function PostCard({ post }) {
	return (
		<div className="py-4">
			<Link href={"/posts/" + post.category + "/" + post.slug}>
				<a className="text-purple-800 dark:text-blue-400">
					<h3 className="text-xl font-bold m-4">{post.title}</h3>
				</a>
			</Link>
			<time className="text-sm">{new Date(post.date).toDateString() + ""}</time>
		</div>
	)
}
