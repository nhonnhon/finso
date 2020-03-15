import React from 'react'
import { connect } from 'react-redux'
import { getDataNewsWithKeyWord, getDataHeadLinesWithKeyWord, changeKeyword } from 'actions'
import { TabsShowData } from 'modules/StoreInformation/components'
import { Lang } from 'constants/language'

class Home extends React.Component {
  componentDidMount() {
    const { keywordHeadLines, keywordNews, getDataNewsWithKeyWord, getDataHeadLinesWithKeyWord } = this.props
    getDataNewsWithKeyWord(keywordNews)
    getDataHeadLinesWithKeyWord(keywordHeadLines)
  }

  render() {
    const { headlines, news, keywordNews, user } = this.props

    return (
      <div className="pt-3 pb-3">
        <h2 className="title-page">{Lang.titleProject}</h2>
        <TabsShowData
          user={user}
          headlines={headlines}
          news={news}
          keywordNews={keywordNews}
          changeKeyword={changeKeyword}
        />
        <hr></hr>
        <h3>Note</h3>
        <p className="mt-1">Homepage have 3 tabs</p>
        <p className="mt-1">
          First tabs: top headline news with image, title (click title to redirect original link) and
          description
        </p>
        <p className="mt-1">
          Second tab: custom news based with keyword, default keyword is BITCOIN, user can change this key
          word in third tab
        </p>
        <p className="mt-1">Third tab: user settings</p>
        <ul style={{ paddingLeft: '40px' }}>
          <li className="mt-1">if user have not logged yet: form login will show</li>
          <li className="mt-1">
            if user does not have account, click button do not have account, the form register will show. Data
            of user is saved in storage
          </li>
          <li className="mt-1">
            After register success, user must log in, if login success, the form change user data will show
            <br></br> (username can not change, only change name and password)
          </li>
          <li className="mt-1">
            After save the changes, the data in seconds tabs will change and based with keyword
          </li>
          <li className="mt-1">Reload and login again with data user just changed</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ temp }) => {
  const { keywordHeadLines, keywordNews, headlines, news, user } = temp

  return {
    keywordHeadLines,
    keywordNews,
    headlines,
    news,
    user,
  }
}

export default connect(
  mapStateToProps,
  { getDataNewsWithKeyWord, getDataHeadLinesWithKeyWord, changeKeyword },
)(Home)
