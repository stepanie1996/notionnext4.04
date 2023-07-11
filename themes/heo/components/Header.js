import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import SearchDrawer from './SearchDrawer'

import { MenuListTop } from './MenuListTop'
import throttle from 'lodash.throttle'
import SideBar from './SideBar'
import SideBarDrawer from './SideBarDrawer'

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const searchDrawer = useRef()

  const [isOpen, changeShow] = useState(false)
  const [headerBgShow, setHeaderBgShow] = useState(false)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const toggleSideBarClose = () => {
    changeShow(false)
  }

  // 监听滚动
  useEffect(() => {
    scrollTrigger()
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  const throttleMs = 200

  /**
     * 根据滚动条，切换导航栏样式
     */
  const scrollTrigger = useCallback(throttle(() => {
    const scrollS = window.scrollY
    const header = document.querySelector('#header')

    // 导航栏设置 白色背景
    if (header && scrollS > 60) {
      setHeaderBgShow(true)
    } else {
      setHeaderBgShow(false)
    }
  }, throttleMs))

  return (<div id='header' className='z-40'>
        <SearchDrawer cRef={searchDrawer} />

        {/* 导航栏 */}
        <div id='sticky-nav' className={`${headerBgShow ? 'bg-white border-b' : 'bg-none'} top-0 duration-300 transition-all fixed  text-black w-full z-20 transform`}>
            <div className='w-full max-w-7xl mx-auto flex justify-between items-center py-2 px-5'>
                <div className='flex'>
                    <Logo {...props} />
                </div>

                {/* 右侧功能 */}
                <div className='mr-1 justify-end items-center '>
                    <div className='hidden lg:flex'> <MenuListTop {...props} /></div>
                    <div onClick={toggleMenuOpen} className='w-8 justify-center items-center h-8 cursor-pointer flex lg:hidden'>
                        {isOpen ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
                    </div>
                </div>
            </div>
        </div>

        {/* 折叠侧边栏 */}
        <SideBarDrawer isOpen={isOpen} onClose={toggleSideBarClose}>
            <SideBar {...props} />
        </SideBarDrawer>
    </div>)
}

export default Header