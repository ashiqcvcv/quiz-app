(this.webpackJsonpquizapp=this.webpackJsonpquizapp||[]).push([[0],[,,,,,,,function(e,n,t){e.exports=t(17)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),s=t(2),a=t.n(s),o=(t(12),t(3)),l=t(4),i=t(6),u=t(5),w=(t(13),t(14),function(e){return c.a.createElement("div",null,c.a.createElement("h1",null,e.question))}),m=(t(15),function(e){var n=Object.keys(e.answer).map((function(n,t){return c.a.createElement("li",{className:e.correctAnswer&&e.clickedAnswer===n?"correct":e.clickedAnswer===n?"incorrect":"",onClick:function(){return e.checkAnswer(e.answer[n],n)},key:n}," ",e.answer[n]," ")}));return c.a.createElement(c.a.Fragment,null,c.a.createElement("ul",{disabled:!!e.clickedAnswer,className:"Answers"},n),c.a.createElement("div",null,e.correctAnswer?"Correct Answer !":e.clickedAnswer?"Wrong Answer":""))}),h=function(e){Object(i.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(o.a)(this,t);for(var r=arguments.length,c=new Array(r),s=0;s<r;s++)c[s]=arguments[s];return(e=n.call.apply(n,[this].concat(c))).state={questions:{1:""},answers:{1:{1:"",2:"",3:""}},correctAnswers:{1:""},correctAnswer:!1,clickedAnswer:!1,step:1,score:0},e.checkAnswer=function(n,t){var r=e.state,c=r.correctAnswers,s=r.step,a=r.score;n===c[s]?e.setState({score:a+1,correctAnswer:!0,clickedAnswer:t}):e.setState({correctAnswer:!1,clickedAnswer:t})},e.nextQuestion=function(n){e.setState({step:n+1,clickedAnswer:0,correctAnswer:0})},e}return Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://opentdb.com/api.php?amount=10").then((function(e){return e.json()})).then((function(n){var t={questions:{},answers:{},correctAnswers:{}};(n=n.results).forEach((function(e,n){e.question=e.question.replace(/(&quot)/g,'"'),t.questions[n+1]=e.question,t.correctAnswers[n+1]=e.correct_answer,e.incorrect_answers.push(e.correct_answer),function(e){for(var n=e.length-1;n>0;n--){var t=Math.floor(Math.random()*(n+1)),r=[e[t],e[n]];e[n]=r[0],e[t]=r[1]}}(e.incorrect_answers),t.answers[n+1]=e.incorrect_answers.reduce((function(e,n,t){return e[t+1]=n,e}),{})})),e.setState({questions:t.questions,answers:t.answers,correctAnswers:t.correctAnswers})}))}},{key:"render",value:function(){var e=this,n=this.state,t=n.questions,r=n.step,s=n.answers,a=n.clickedAnswer,o=n.correctAnswer,l=n.score;return c.a.createElement("div",{className:"answer"},c.a.createElement("div",{className:"Content"},r<=Object.keys(t).length?c.a.createElement("div",null,c.a.createElement("h1",null,c.a.createElement("span",null,r," of 10 questions")),c.a.createElement("h1",null,"Score : ",c.a.createElement("span",null,l)),c.a.createElement(w,{question:t[r]}),c.a.createElement(m,{answer:s[r],step:r,checkAnswer:this.checkAnswer,correctAnswer:o,clickedAnswer:a}),c.a.createElement("button",{onClick:function(){return e.nextQuestion(e.state.step)},className:"NextStep",disabled:!(a&&Object.keys(t).length>=r)},"Next Question")):c.a.createElement("div",{className:"finalPage"},c.a.createElement("h1",null,"You have completed the quiz !"),c.a.createElement("p",null,"Your score is: ",l," of ",Object.keys(t).length),c.a.createElement("p",null,"Thank You"))))}}]),t}(r.Component);t(16);var p=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},"Quiz App"),c.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.6c588d3a.chunk.js.map