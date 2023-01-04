# Nwitter
Twitter (mini) Clone with React and Firebase

react : 18.2.0, 
firebase : version 9

firebase v9 : onSnapshot은 async-await 사용 불가

re-rendering : useState, props update


Error handling
1) Warning: A component is changing an uncontrolled input of type undefined to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.
===> input tag 안에 value=""로 설정

2) github page hosting 빈 화면 
BrowserRouter를 HashRouter로 바꿈