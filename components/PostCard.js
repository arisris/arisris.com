import Link from "next/link"

export default function PostCard({ post }) {
	return (
		<div className="py-4">
			<Link href={"/posts/" + post.category + "/" + post.slug}>
				<a className="hover:text-purple-900 text-purple-700 text-2xl font-bold">
					<h3>{post.title}</h3>
				</a>
			</Link>
			<time className="text-sm">{new Date(post.date).toDateString() + ""}</time>
		</div>
	)
}
