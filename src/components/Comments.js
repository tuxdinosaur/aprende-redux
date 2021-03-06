import React, { Component } from 'react'
import replace from 'react-string-replace'

import Mention from './Mention'
import CommentForm from './CommentForm'

export default class extends Component {
  state = { show: true }
  toggleComments = () => this.setState(({ show }) => ({ show: !show }))
  render = () => (
    <div className="comments">
      {this.state.show && (
        <div className="comments-list">
          {this.props.postComments.map(
            ({ from: { full_name: name }, text }, i) => (
              <div className="comment" key={i}>
                <p>
                  <strong>{name}</strong>
                  {replace(text, /@(\w+)/g, (user, i) => (
                    <Mention key={i} user={user} />
                  ))}
                  <button
                    onClick={() =>
                      this.props.removeComment(this.props.params.postId, i)
                    }
                    className="remove-comment"
                  >
                    &times;
                  </button>
                </p>
              </div>
            )
          )}
          <CommentForm {...this.props} />
        </div>
      )}
      <div className="control-buttons">
        <button onClick={this.toggleComments}>
          {this.state.show ? 'Hide' : 'Show'} comments
        </button>
      </div>
    </div>
  )
}
