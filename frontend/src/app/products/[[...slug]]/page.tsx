import React from 'react'
interface Props {
    params: { slug: string[] }
    searchParams: { sortOrder: string }
}

const ProductPage = async ({ params, searchParams }: Props) => {
    const { slug } = await params;
    const { sortOrder } = await searchParams;

    return (
        <div>ProductPage {slug}{sortOrder}</div>
    )
}

export default ProductPage