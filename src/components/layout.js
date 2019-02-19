import React, {useContext, createContext} from 'react'
import {css, Global} from '@emotion/core'
import {Link, StaticQuery, graphql} from 'gatsby'
import {ThemeProvider} from 'emotion-theming'
import Switch from 'react-switch'

import {rhythm} from '../utils/typography'
import useInjectState from '../utils/hooks/useInjectState'

const theme = {
  dark: {
    color: 'white',
    background: 'black',
  },
  light: {
    color: 'black',
    background: 'white',
  },
}

const themeContext = createContext()

function useTheme() {
  return useContext(themeContext)
}

function Layout({children}) {
  const [isDark, setIsDark] = useInjectState(
    () => localStorage.getItem('theme') === 'dark',
    v => localStorage.setItem('theme', v ? 'dark' : 'light'),
  )
  const toggle = () => setIsDark(b => !b)
  return (
    <themeContext.Provider value={{isDark, setIsDark, toggle}}>
      <ThemeProvider theme={theme[isDark ? 'dark' : 'light']}>
        <Global
          styles={styles => ({
            'body, a, h1, a h1, a h3': {
              ...styles,
              transition: '0.3s color ease',
            },
          })}
        />
        <StaticQuery
          query={graphql`
            query {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
        >
          {data => (
            <div
              css={css`
                margin: 0 auto;
                max-width: 700px;
                padding: ${rhythm(2)};
                padding-top: ${rhythm(1.5)};
              `}
            >
              <Link to={`/`}>
                <h3
                  css={css`
                    margin-bottom: ${rhythm(2)};
                    display: inline-block;
                    font-style: normal;
                  `}
                >
                  {data.site.siteMetadata.title}
                </h3>
              </Link>
              <Switch
                css={{
                  float: 'right',
                }}
                onChange={toggle}
                checked={isDark}
                offColor="#bbb"
                onColor="#bbb"
                offHandleColor="#ffc800"
                onHandleColor="#fff"
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                width={48}
                handleDiameter={30}
              />
              <Link
                to={`/about/`}
                css={{
                  marginRight: 12,
                  float: 'right',
                }}
              >
                About
              </Link>
              {children}
            </div>
          )}
        </StaticQuery>
      </ThemeProvider>
    </themeContext.Provider>
  )
}

export {useTheme}
export default Layout
