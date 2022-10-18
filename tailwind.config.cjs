/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        opensans: '"Open Sans"'
      },
      fontSize: {
        nine: '9px',
        ten: '10px',
        'ten-half': '10.5px',
        eleven: '11px',
        14: '14px',
        btn: '13px',
        common: '13px',
      },
      screens: {
        '3xl': '1700px',
        '4xl': '2560px',
        '5xl': '5120px',
      },
      boxShadow: {
        outer1:
          '0px -1px 10px rgba(0, 0, 0, 0.02), 0px 3px 10px rgba(0, 0, 0, 0.05)',
        outer2: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        outer3:
          '0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31)',
        outer4:
          '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)',
      },
      borderRadius: {
        four: '4px',
        five: '5px'
      },
      width: {
        42: '168px',
        90: '360px',
        92: '368px',
        68: '272px',
        135: '540px',
        140: '560px',
        150: '600px',
        166: '664px',
        176: '704px',
        190: '760px',
        200: '800px'
      },
      minWidth: {
        240: '240px'
      },
      height: {
      },
      lineHeight: {
        '3.5': '14px'
      },
      margin: {
        '5px': '5px'
      },
      spacing: {
        m: '32px',
        l: '40px',
        '3-5': '0.875rem',
        85: '21.25rem',
        99: '24.75rem',
        '104-25': '26.0625rem',
        105: '26.25rem',
        120: '30rem',
        125: '31.25rem',
        164: '41rem',
      },
      colors: {
        brand: '#2E4E6F',
        caption: '#BABABA',
        status: {
          verified: '#1FDBB9',
          success: '#37B487',
          error: '#ED1C24',
          peding: '#F2C94C',
          online: '#00DCD0',
          busy: '#F2994A',
          offline: '#C5C5C5',
          warning: '#F6C443',
          standard: '#3C638B',
          white:'#ffffff',
        },
        blue: {
          100: '#0052CC',
          200: '#0043A7'
        },
        gray: {
          100:'#8F92A1',
          10:'rgb(245,245,245)'
        },
        red: {
          0.5: '#FCEDED',
          1:'#ED1C24',
          4: '#FF0000',
          20:"rgb(248,215,206)",
          100:"rgb(222,53,11)"
        },
        green:{
          1:'#1FDBB9',
        },
        white:{
          5:'#F2F2F2',
          10:'#E6E6E6',
          60:'#666666',
          100:'#FFFFFF'
        },
        yellow:{
          10:"rgb(255,235,210)",
          100:"rgb(255,153,31)"
        }
      },
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
}
