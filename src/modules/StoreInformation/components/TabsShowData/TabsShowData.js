import React from 'react'
import _ from 'lodash'
import { Lang } from 'constants/language'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Login, Register } from 'modules/StoreInformation/components'
import UserSettings from './UserSetting'

import './styles.scss'

class TabsShowData extends React.Component {
  constructor(props) {
    super(props)
    const {
      keywordNews,
      user: { name, username, password },
    } = this.props

    this.state = {
      isLogged: false,
      isLogin: true,
      keywordNews,
      name,
      username,
      password,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.keywordNews !== this.props.keywordNews) {
      this.setState({
        keywordNews: nextProps.keywordNews,
      })
    }

    if (nextProps.user !== this.props.user) {
      this.setState({
        ...nextProps.user,
      })
    }
  }

  toggleForm = () => {
    const { isLogin } = this.state
    this.setState({
      isLogin: !isLogin,
    })
  }

  loginSuccess = () => {
    const { isLogged } = this.state
    this.setState({
      isLogged: !isLogged,
    })
  }

  onChangeInput = (id, value) => {
    this.setState({
      [id]: value,
    })
  }

  renderDataTabs = articles =>
    _.map(articles, (article, index) => {
      const { urlToImage, title, description, url } = article

      return (
        <div className="col-md-4" key={index}>
          <div className="article">
            <div className="image" style={{ backgroundImage: `url(${urlToImage})` }}></div>
            <h3>
              <a href={url}>{title}</a>
            </h3>
            <p>{description}</p>
          </div>
        </div>
      )
    })

  renderUserSettings = () => {
    return (
      <div className="row">
        <div className="col-sm-6">
          <UserSettings {...this.state} onChangeInput={this.onChangeInput} />
        </div>
      </div>
    )
  }

  render() {
    const { isLogin, isLogged } = this.state
    const { headlines, news, keywordNews } = this.props
    const articlesHeadLines = headlines.articles
    const articlesNews = news.articles

    return (
      <div className="pt-3 pb-3">
        <Tabs onSelect={this.handleChangeTab}>
          <TabList>
            <Tab className="react-tabs__tab">{Lang.topHeadlines}</Tab>
            <Tab className="react-tabs__tab">{`${_.toUpper(keywordNews)} ${Lang.news}`}</Tab>
            <Tab className="react-tabs__tab">{Lang.userSettings}</Tab>
          </TabList>

          <TabPanel>
            {Array.isArray(articlesHeadLines) && !_.isEmpty(articlesHeadLines) ? (
              <div className="row pt-2">{this.renderDataTabs(articlesHeadLines)}</div>
            ) : (
              <div>{Lang.noData}</div>
            )}
          </TabPanel>
          <TabPanel>
            {Array.isArray(articlesNews) && !_.isEmpty(articlesNews) ? (
              <div className="row pt-2">
                <h4>{`This is ${_.toUpper(
                  keywordNews,
                )} news, you can change keyword news in User Setting tab`}</h4>
                {this.renderDataTabs(articlesNews)}
              </div>
            ) : (
              <div>{Lang.noData}</div>
            )}
          </TabPanel>
          <TabPanel>
            <div className="pt-2">
              {isLogged ? (
                this.renderUserSettings()
              ) : isLogin ? (
                <React.Fragment>
                  <h3>{Lang.loginToChangeData}</h3>
                  <Login loginSuccess={this.loginSuccess} toggleForm={this.toggleForm} />
                </React.Fragment>
              ) : (
                <Register toggleForm={this.toggleForm} />
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default TabsShowData
