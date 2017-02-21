/**
 * @Author:      zhq
 * @DateTime:    2017-01-06 17:33:42
 * @Description: Description
 * @Last Modified By:   zhq
 * @Last Modified Time:    2017-01-06 17:33:42
 */

import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

const CommentBox = React.createClass({

  //初始化组件，只执行一次
  getInitialState: function(){
    return {
      data: []
    }
  },

  //请求数据
  loadCommentsFromServer: function(){
    let url = 'src/data/data.json'
    $.ajax({
      url: url,
      success: function(data){
        this.setState({
          data: data.result
        })
      }.bind(this),
      error: function(xhr, status, err){
        console.error(url, status, err.toString())
      }.bind(this)
    })
  },

   //提交到服务器并刷新列表
  handleCommentSubmit: function(comment){
    var oComment = this.state.data
    var nComment = comment.newComment
    var data = oComment.concat(nComment)
    console.log(data)
    this.setState({
      data: data
    })
   //  let url = 'src/data/data.json'
   //  $.ajax({
   //     url: url,
   //     data: comment,
   //     success: function(data){
   //      this.setState({
   //        data: data.result
   //      })
   //     }.bind(this),
   //    error: function(xhr, status, err){
   //      console.error(url, status, err.toString())
   //    }.bind(this)
   // })   
  },

  //在render之后执行，同一个组件重复渲染只执行一次
  componentDidMount: function() {
    console.log('componentDidMount')
    this.loadCommentsFromServer()
  },

  render: function(){
    console.log('render')
    return (
      <div className="CommentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
})

const CommentList = React.createClass({
  render: function(){
    var commentNodes = this.props.data.map(function(comment){
      return (
        <Comment author={comment.authohr} key={comment.id}>
          <h2>{comment.author}</h2>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
})

//构造表单
var i = 4
const CommentForm = React.createClass({

  //提交表单
  handleSubmit: function(e){
    var newComment = []
    e.preventDefault()
    //获取content
    let author = this.refs.author.value
    let text = this.refs.text.value
    
    if(!text || !author){
      return
    }else{
      newComment.push({
        id: i++,
        author: author,
        text: text
      })
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({
      newComment
    })
    this.refs.author.value=''
    this.refs.text.value=''
    return 
  },

  render: function(){
    return (
      <div>
         <p>添加评论:</p>
         <form className="CommentForm" onSubmit={this.handleSubmit}>
         name: <input type='text' placeholder='Your name' ref="author" className='authorInput' onChange={this.handleChange} /> <br/>
         content:  <textarea rows="10" cols="30" placeholder='Say something...' ref="text"></textarea> <br/>
         <input type='submit' value='post' className='submit' />
        </form>
      </div>
     
    )
  }
})

//评论组件,props父向子传递，读取CommentList传递过来的值
const Comment = React.createClass({
  render: function(){
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    )
  }
})

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
)



