const commenbar = {
    padding: '20px',
    borderRadious: '10px',
    background: 'black',
    color: 'white',
    border: 'none'
}


export const styles = {
    gradiant: {
        padding: "100px 0px",
        background: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`
    },
    gradiant2: {
        padding: "100px 0px",
        background: 'linear-gradient(45deg,#ffde00,#00d1c3)',
    },
    sidebarOpen:{
        ...commenbar,
        width: '300px'
    },
    sidebarClose:{
        ...commenbar,
        width: '100px'

    }
}


