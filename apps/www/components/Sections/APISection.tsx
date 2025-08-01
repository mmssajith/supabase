// Import Swiper styles if swiper used on page
import 'swiper/css'

import Link from 'next/link'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, Tabs } from 'ui'
import CodeBlock, { LANG } from '../CodeBlock/CodeBlock'
import { ArrowUpRight } from 'lucide-react'

export interface APIExample {
  lang: LANG
  title: string
  code: string
}

interface Props {
  size?: 'small' | 'large'
  content: APIExample[]
  title: string | React.ReactNode
  footer?: React.ReactNode
  text?: React.ReactNode
  autoHeight?: boolean
  documentation_link?: string
  showLineNumbers?: boolean
  ctaLabel?: string
}

function APISection(props: Props) {
  // store API swiper instance
  const [apiSwiper, setApiSwiper] = useState(undefined)
  const [apiSwiperActiveIndex, setApiSwiperActiveIndex] = useState(0)

  function handleApiSwiperNavChange(e: number) {
    setApiSwiperActiveIndex(e)
    // @ts-ignore
    apiSwiper.slideTo(e)
  }

  return (
    <div className="grid grid-cols-12 lg:gap-16">
      <div className="col-span-12 pb-8 lg:col-span-5 xl:col-span-5">
        <h2 className="h2">{props.title}</h2>
        <div className="p">{props.text}</div>
        {props.documentation_link && (
          <Button asChild size="small" className="mt-4" type="default" icon={<ArrowUpRight />}>
            <Link href={props.documentation_link} as={props.documentation_link}>
              {props.ctaLabel ? props.ctaLabel : 'Explore documentation'}
            </Link>
          </Button>
        )}
        {props.footer && <div className="py-8">{props.footer}</div>}
      </div>
      <div className="sbui-tabs--alt col-span-12 lg:col-span-7 xl:col-span-6 xl:col-start-7">
        <Tabs
          scrollable
          activeId={apiSwiperActiveIndex.toString()}
          onChange={(id: string) => handleApiSwiperNavChange(Number(id))}
        >
          {props.content &&
            props.content.map((content: APIExample, i) => (
              <Tabs.Panel label={content.title} id={i.toString()} key={i}>
                <span key={i}></span>
              </Tabs.Panel>
            ))}
        </Tabs>
        <div className="overflow-hidden">
          <Swiper
            // @ts-ignore
            onSwiper={setApiSwiper}
            style={{ zIndex: 0, marginRight: '1px' }}
            initialSlide={apiSwiperActiveIndex}
            spaceBetween={0}
            slidesPerView={1}
            speed={300}
            allowTouchMove={false}
            autoHeight={props.autoHeight ? props.autoHeight : false}
          >
            {props.content &&
              props.content.map((content: APIExample, i) => (
                <SwiperSlide key={i}>
                  <CodeBlock
                    key={i}
                    lang={content.lang}
                    size={props.size ? props.size : 'small'}
                    showLineNumbers={props.showLineNumbers}
                  >
                    {content.code}
                  </CodeBlock>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default APISection
