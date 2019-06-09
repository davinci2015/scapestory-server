import React from 'react'
import Link from 'next/link'
import routes, {routeMapping} from 'routes'
import * as styles from 'styles'

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
                <Link as={routeMapping.profile.as('test')} href={routeMapping.profile.href('test')}>
                    <a>Profile</a>
                </Link>
            </div>
        </div>

        <style jsx>{`
            nav {
                width: 100%;
                height: 64px;
                background-color: ${styles.colors.PRIMARY};
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
        `}</style>

    </nav>
)

export default Navigation