import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({
  title = 'Selamat datang di BeliYok!',
  description = 'Kami menjual barang-barang murah berkualitas',
  keywords = 'toko online, barang murah, beli barang murah, elektronik',
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name='description' content={description} />
    <meta name='keywords' content={keywords} />
  </Helmet>
)

export default Meta
