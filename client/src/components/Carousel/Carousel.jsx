import React, { Component } from 'react'
import { arrayOf, string, shape } from 'prop-types'
import styles from './Carousel.scss'

class Carousel extends Component {
  static propTypes = {
    slides: arrayOf(shape({
      image: string.isRequired,
      text: string.isRequired,
    }).isRequired).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeSlide: 0,
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  /**
   * Set the active slide in the carousel
   *
   * @param {number} activeSlide
   */
  setActiveSlide = activeSlide => { this.setState({ activeSlide })}

  /**
   * Go to the next slide in the carousel
   */
  nextSlide = () => {
    const { activeSlide } = this.state
    const { slides } = this.props

    if (activeSlide < slides.length - 1) {
      // Go to the next slide
      this.setActiveSlide(activeSlide + 1)
    } else {
      // Restart the carousel
      this.setActiveSlide(0)
    }
  }

  /**
   * Go to the previous slide in the carousel
   */
  previousSlide = () => {
    const { activeSlide } = this.state
    const { slides } = this.props

    if (activeSlide > 0) {
      // Go to the previous slide
      this.setActiveSlide(activeSlide - 1)
    } else {
      // Restart the carousel
      this.setActiveSlide(slides.length - 1)
    }
  }

  render() {
    const { slides } = this.props
    const { activeSlide } = this.state

    const slide = slides[activeSlide]
    return (
      <div className={styles.slider}>
        <img
          className={styles.image}
          src={slide.image}
          sizes={slide.sizes}
          srcSet={slide.srcSet}
          alt={slide.text}
        />
        <div className={styles.text}>
          <span>{slide.text}</span>
        </div>
      </div>
    )
  }
}

export default Carousel
