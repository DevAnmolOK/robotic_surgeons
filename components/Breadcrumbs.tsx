import React from 'react'

type Breadcrumb = {
    label: string;
    href: string;
};

type BannerProps = {
    title: string;
    bgImage: string;
    breadcrumbs?: Breadcrumb[];
}


const Breadcrumbs : React.FC<BannerProps> = ({title , bgImage}) => {

    const backgroundStyle = bgImage
        ? { backgroundImage: `url(${bgImage})`}
        : { backgroundImage: "url('/homePage/heroimage.jpg')" };

  return (
     <div
          className="relative sm:h-[14.5rem] h-[10rem] w-full bg-cover bg-center"
          style={backgroundStyle}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
            <h1 className="text-white text-p3xl font-bold">{title ?? ''}</h1>
          </div>
        </div>
  )
}

export default Breadcrumbs