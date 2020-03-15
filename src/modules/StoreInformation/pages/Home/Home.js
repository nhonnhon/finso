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
