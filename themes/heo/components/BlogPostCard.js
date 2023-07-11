import Link from 'next/link'
import React from 'react'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'
import BLOG from '@/blog.config'
// import Image from 'next/image'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview = CONFIG.POST_LIST_PREVIEW && post.blockMap
  if (post && !post.pageCoverThumbnail && CONFIG.POST_LIST_COVER_DEFAULT) {
    post.pageCover = siteInfo?.pageCoverThumbnail
  }
  const showPageCover = CONFIG.POST_LIST_COVER && post?.pageCoverThumbnail && !showPreview
  //   const delay = (index % 2) * 200

  return (
        <div className={`${CONFIG.POST_LIST_COVER_HOVER_ENLARGE ? ' hover:scale-110 transition-all duration-150' : ''}`} >
            <div
                // data-aos="fade-up"
                // data-aos-easing="ease-in-out"
                // data-aos-duration="800"
                // data-aos-once="false"
                // data-aos-anchor-placement="top-bottom"
                id='blog-post-card'
                key={post.id}
                className={`w-full justify-between flex flex-col-reverse lg:h-96  ${CONFIG.POST_LIST_IMG_CROSSOVER && index % 2 === 1 ? '' : ''}
                    overflow-hidden border dark:border-black rounded-xl bg-white dark:bg-hexo-black-gray`}>

                {/* 文字内容 */}
                <BlogPostCardInfo index={index} post={post} showPageCover={showPageCover} showPreview={showPreview} showSummary={showSummary} />

                {/* 图片封面 */}
                {showPageCover && (
                    <div className="md:w-5/12 lg:w-full overflow-hidden">
                        <Link href={`${BLOG.SUB_PATH}/${post.slug}`} passHref legacyBehavior>
                            <div className='h-56 bg-center bg-cover hover:scale-110 duration-200' style={{ backgroundImage: `url('${post?.pageCoverThumbnail}')` }} />
                        </Link>
                    </div>
                )}

            </div>

        </div>

  )
}

export default BlogPostCard