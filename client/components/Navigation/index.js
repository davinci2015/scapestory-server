import React from 'react'
import css from 'styled-jsx/css'
import Link from 'next/link'
import routes from '../../routes'
import colors from '../../styles/colors'

const styles = css`
    nav {
        width: 100%;
        height: 64px;
        background-color: ${colors.TERTIARY};
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }
    
    .container {
        max-width: 70%;
        height: 100%;
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
    }
`

const Navigation = () => (
    <nav>
        <div className="container">
            <div>
                <Link href={routes.index}>
                    <a>Home</a>
                </Link>
                <Link href={routes.news}>
                    <a>News</a>
                </Link>
            </div>
            <div>
                <Link href={routes.profile}>
                    <a>Profile</a>
                </Link>
            </div>
        </div>
        <style jsx>{styles}</style>
    </nav>
)

export default Navigation