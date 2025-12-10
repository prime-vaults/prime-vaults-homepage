import { RouteObject } from 'react-router-dom'

import BlogLayout from '@/app/blog/Layout'

import { RouterKeys } from '@/constant/router'
import BlogPage from '@/app/blog/Page'
import BlogDetails from '@/app/blog/blog-details/Page'

export const blogRoutes: RouteObject = {
  path: RouterKeys.Blog,
  element: <BlogLayout />,
  children: [
    { index: true, element: <BlogPage /> },
    { path: ':pageId', element: <BlogDetails /> },
  ],
}
