import React, { useState, useMemo, useCallback, useEffect } from 'react'
import './style'

interface CarouselProps {
  itemList: string[]
}

interface TransitionProps {
  doTransition: boolean
  index: number
}

enum RecoverElapse {
  normal = 0,
  slow = 1000,
}

const Carousel = ({ itemList }: CarouselProps) => {
  const extendedList = useMemo(
    () => [
      itemList[itemList.length - 2],
      itemList[itemList.length - 1],
      ...itemList,
      itemList[0],
      itemList[1],
    ],
    [itemList]
  )
  const [recoverElapse, setRecoverElapse] = useState<number>(
    RecoverElapse.normal
  )
  const [carouselOn, setCarouselOn] = useState<boolean>(true)
  const [transitionProps, setTransitionProps] = useState<TransitionProps>({
    doTransition: true,
    index: 0,
  })
  useEffect(() => {
    if (!transitionProps.doTransition) {
      setTimeout(() => {
        setTransitionProps({
          doTransition: true,
          index: 0,
        })
      }, recoverElapse)
    }
  }, [transitionProps.doTransition])
  const onClick = () => {
    const maxIndex = itemList.length - 1
    if (carouselOn && index + 1 > maxIndex) {
      console.warn('pause transition')
      setTransitionProps({
        doTransition: false,
        index: -1,
      })
    } else {
      setTransitionProps({
        ...transitionProps,
        index: index + 1,
      })
    }
  }
  const onCarouselButtonClick = () => {
    setCarouselOn((prev: boolean) => !prev)
  }
  const onRecoverButtonClick = () => {
    if (recoverElapse === RecoverElapse.normal) {
      setRecoverElapse(RecoverElapse.slow)
    } else {
      setRecoverElapse(RecoverElapse.normal)
    }
  }
  const { index, doTransition } = transitionProps
  console.log(transitionProps)
  const containerStyle = {
    transform: `translateX(calc(-512px * ${index + 1}))`,
    transition: doTransition ? 'transform 300ms ease-in-out' : 'none',
  }

  return (
    <>
      <div className="carousel" onClick={onClick}>
        <div className="carousel-item-container" style={containerStyle}>
          {extendedList.map((item: string, index: number) => (
            <div
              key={index}
              className="carousel-item"
              style={{ backgroundColor: item }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={onCarouselButtonClick}>
        {`Carousel: ${carouselOn ? 'on' : 'off'}`}
      </button>
      <button type="button" onClick={onRecoverButtonClick}>
        {`Elapse to recover: ${recoverElapse}`}
      </button>
      <p>{`index: ${index}`}</p>
    </>
  )
}

export default Carousel
