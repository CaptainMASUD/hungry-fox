import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {Outlet} from 'react-router-dom'
import ThemeProvider from '../ThemeProvider/ThemeProvider';


function Layout() {
  return (
    <>
    <ThemeProvider>
      <Header/>
      <Outlet/>
      <Footer/>
    </ThemeProvider>
    </>
  )
}

export default Layout
