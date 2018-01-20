import React from 'react'
import i18n from 'lib/i18n'
import { localeType } from 'lib/propTypes'
import { Button, Carousel } from 'components'
import TripList from 'modules/Trips/TripList'
import styles from './Home.scss'
import translations from './Home.i18n.yaml'
import slider0_200 from './slider0-200.jpg'
import slider0_400 from './slider0-400.jpg'
import slider0_800 from './slider0-800.jpg'
import slider0_1400 from './slider0-1400.jpg'
import slider0_2200 from './slider0-2200.jpg'
import slider0_2600 from './slider0-2600.jpg'
import slider0_3200 from './slider0-3200.jpg'
import slider1_200 from './slider1-200.jpg'
import slider1_400 from './slider1-400.jpg'
import slider1_800 from './slider1-800.jpg'
import slider1_1400 from './slider1-1400.jpg'
import slider1_2200 from './slider1-2200.jpg'
import slider1_2600 from './slider1-2600.jpg'
import slider1_3200 from './slider1-3200.jpg'
import slider2_200 from './slider2-200.jpg'
import slider2_400 from './slider2-400.jpg'
import slider2_800 from './slider2-800.jpg'
import slider2_1400 from './slider2-1400.jpg'
import slider2_2200 from './slider2-2200.jpg'
import slider2_2600 from './slider2-2600.jpg'
import slider2_3200 from './slider2-3200.jpg'
import slider3_200 from './slider3-200.jpg'
import slider3_400 from './slider3-400.jpg'
import slider3_800 from './slider3-800.jpg'
import slider3_1400 from './slider3-1400.jpg'
import slider3_2200 from './slider3-2200.jpg'
import slider3_2600 from './slider3-2600.jpg'
import slider3_3200 from './slider3-3200.jpg'
import slider4_200 from './slider4-200.jpg'
import slider4_400 from './slider4-400.jpg'
import slider4_800 from './slider4-800.jpg'
import slider4_1400 from './slider4-1400.jpg'
import slider4_2200 from './slider4-2200.jpg'
import slider4_2600 from './slider4-2600.jpg'
import slider4_3200 from './slider4-3200.jpg'

const Home = ({ locale }) => {
  i18n.extend(translations[locale.code])

  return (
    <div className={styles.container}>
      <Carousel
        slides={[
          {
            text: i18n.t('home.sliders.0.text'),
            image: slider0_800,
            srcSet: `
              ${slider0_200} 200w,
              ${slider0_400} 400w,
              ${slider0_800} 800w,
              ${slider0_1400} 1400w,
              ${slider0_2200} 2200w,
              ${slider0_2600} 2600w,
              ${slider0_3200} 3200w
            `,
          },
          {
            text: i18n.t('home.sliders.1.text'),
            image: slider1_800,
            srcSet: `
              ${slider1_200} 200w,
              ${slider1_400} 400w,
              ${slider1_800} 800w,
              ${slider1_1400} 1400w,
              ${slider1_2200} 2200w,
              ${slider1_2600} 2600w,
              ${slider1_3200} 3200w
            `,
          },
          {
            text: i18n.t('home.sliders.1.text'),
            image: slider2_800,
            srcSet: `
              ${slider2_200} 200w,
              ${slider2_400} 400w,
              ${slider2_800} 800w,
              ${slider2_1400} 1400w,
              ${slider2_2200} 2200w,
              ${slider2_2600} 2600w,
              ${slider2_3200} 3200w
            `,
          },
          {
            text: i18n.t('home.sliders.1.text'),
            image: slider3_800,
            srcSet: `
              ${slider3_200} 200w,
              ${slider3_400} 400w,
              ${slider3_800} 800w,
              ${slider3_1400} 1400w,
              ${slider3_2200} 2200w,
              ${slider3_2600} 2600w,
              ${slider3_3200} 3200w
            `,
          },
          {
            text: i18n.t('home.sliders.1.text'),
            image: slider4_800,
            srcSet: `
              ${slider4_200} 200w,
              ${slider4_400} 400w,
              ${slider4_800} 800w,
              ${slider4_1400} 1400w,
              ${slider4_2200} 2200w,
              ${slider4_2600} 2600w,
              ${slider4_3200} 3200w
            `,
          },
        ]}
      />

      <Button className={styles.callToAction}>
        {i18n.t('home.contact')}
      </Button>

      <TripList />
    </div>
  )
}
Home.propTypes = {
  locale: localeType,
}

export default Home
