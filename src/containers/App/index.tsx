import React from 'react'
import Carousel from '@components/Carousel'
import './style.scss'

const itemList: string[] = ['red', 'blue', '#fca311', 'grey', 'green']

const App = () => {
  return (
    <div className="app">
      <h1>Carousel by react</h1>
      <Carousel itemList={itemList} />
    </div>
  )
}

export default App
