import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';
import _ from 'underscore';
import $ from 'jquery';

export default class Buttons extends Component {

  static propTypes = {
    styles: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired,
    getLineBlocks: PropTypes.func.isRequired,
    block: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    setMatrixResultValue: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.captions = captions.matrix;
    this.lvlsCaptions = captions.lvlsCaptions;
  }

  getPercent() {
    const { getLineBlocks, level } = this.props;
    if (level === 0) {
      const lineBlocks = getLineBlocks(level);
      const count = _.size(lineBlocks);
      const errLineBlocks = _.where(lineBlocks, {
        value: 0
      });
      const errCount = _.size(errLineBlocks);
      const intResult = parseInt((count - errCount) / count * 100, 10);
      this.props.setMatrixResultValue(intResult);
      return {
        str: intResult + '%',
        val: intResult
      };
    }
    return {
      str: '???',
      val: 0
    };
  }

  getLevelCaption(val) {
    const { level } = this.props;
    const lvlCaptions = this.lvlsCaptions[level];
    if (_.size(lvlCaptions) === 1) {
      return lvlCaptions[0].text;
    }
    for (const e of lvlCaptions) {
      if (val >= e.minValue && val <= e.maxValue) {
        return e.text;
      }
    }
    return 'error';
  }

  handleExternalLink(event) {
    ga('send', 'event', 'externalLink', $(event.currentTarget).attr('href')); // eslint-disable-line
  }

  renderArticleButton(styles, icons, results) {
    return (
      <a
        href="http://createdigital.me/blog/2015/10/19/matrica-cifrovogo-produkta-vvodnaya/"
        target="_blank"
        className={styles.transparentButton}
        onClick={::this.handleExternalLink}
      >
        <i className={icons.matrix1}></i>
        {results.articleTitle}
      </a>
    );
  }

  render() {
    const { styles, icons, block } = this.props;
    const { str, val } = this.getPercent();
    const lvlCaption = this.getLevelCaption(val);
    const { results } = captions;
    return (
      <div className={styles.left}>
        <div className={styles.leftLabel}>
          <i className={icons[block.left.icon]}></i>
          <span dangerouslySetInnerHTML={{__html: block.left.label}}/>
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressTop}>
            <div className={styles.progressCaption}>
              {this.captions.progressCaption}
            </div>
            <div className={styles.progressPercent}>
              {str}
            </div>
          </div>
          <div className={styles.progress}>
            <div className={styles.progressActive} style={{width: val + '%'}}></div>
          </div>
          <div
            className={styles.progressP}
            dangerouslySetInnerHTML={{__html: lvlCaption}}
          />
          {this.props.level === 0 &&
            this.renderArticleButton(styles, icons, results)
          }
        </div>
      </div>
    );
  }
}

// <div className={styles.progressWrap}>
//   <div className={styles.progressTop}>
//     <div className={styles.progressCaption}>
//       {this.captions.progressCaption}
//     </div>
//     <div className={styles.progressPercent}>
//       {str}
//     </div>
//   </div>
//   <div className={styles.progress}>
//     <div className={styles.progressActive} style={{width: val + '%'}}></div>
//   </div>
//   <div
//     className={styles.progressP}
//     dangerouslySetInnerHTML={{__html: lvlCaption}}
//   />
//   {this.props.level === 0 &&
//     this.renderArticleButton(styles, icons, results)
//   }
// </div>
