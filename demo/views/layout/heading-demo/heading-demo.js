import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Heading from 'components/heading';
import Textbox from 'components/textbox';
import Row from 'components/row';

class HeadingDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['heading', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'heading');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Heading
        title={ this.value('title') }
        subheading={ this.value('subheading') }
        helpLink={ this.value('help_link') }
        help={ this.value('help') }
        backLinkHref={ this.value('back_link_href') }
        backLinkTo={ this.value('back_link_to') }
      />
    )
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Heading from 'carbon/lib/components/heading';\n\n";

    html += '<Heading';

    if (this.value('title')) {
      html += `\n  title='${this.value('title')}'`
    }

    if (this.value('subheading')) {
      html += `\n  subheading='${this.value('subheading')}'`
    }

    if (this.value('help_link')) {
      html += `\n  helpLink='${this.value('help_link')}'`
    }

    if (this.value('help')) {
      html += `\n  help='${this.value('help')}'`
    }

    if (this.value('back_link_href')) {
      html += `\n  backLinkHref='${this.value('back_link_href')}'`
    }

    if (this.value('back_link_to')) {
      html += `\n  backLinkTo='${this.value('back_link_to')}'`
    }

    html += '\n/>'

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <Textbox
            label="Title"
            labelInline={ true }
            value={ this.value('title') }
            onChange={ this.action.bind(this, 'title') }
          />
          <Textbox
            label="Subheading"
            labelInline={ true }
            value={ this.value('subheading') }
            onChange={ this.action.bind(this, 'subheading') }
          />
        </Row>

        <Row>
          <Textbox
            label="Help"
            labelInline={ true }
            value={ this.value('help') }
            onChange={ this.action.bind(this, 'help') }
          />
          <Textbox
            label="Help Link"
            labelInline={ true }
            value={ this.value('help_link') }
            onChange={ this.action.bind(this, 'help_link') }
          />
        </Row>

        <Row>
          <Textbox
            label="Back Link Href"
            labelInline={ true }
            value={ this.value('back_link_href') }
            onChange={ this.action.bind(this, 'back_link_href') }
          />
          <Textbox
            label="Back Link To"
            labelInline={ true }
            value={ this.value('back_link_to') }
            onChange={ this.action.bind(this, 'back_link_to') }
          />
        </Row>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Heading"
        readme='components/heading'
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }

}

export default connect(HeadingDemo, AppStore);
