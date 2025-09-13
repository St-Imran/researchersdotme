import React from 'react';
import Head from 'next/head'
import CardMenu from '../../Common/CardMenu/CardMenu'
import { blogsCardData } from '../../constants/blogsCardData'

export default function BlogsPage () {
  return (
    <React.Fragment>
      <Head>
        <meta name="description" content="Researchers Blogs" />
      </Head>
      <CardMenu
        data={blogsCardData}
        pageTitle="Our Blogs"
        pageDescription="Explore our latest articles and insights."
        smallTitle={true}
      />
    </React.Fragment>
  )
}



