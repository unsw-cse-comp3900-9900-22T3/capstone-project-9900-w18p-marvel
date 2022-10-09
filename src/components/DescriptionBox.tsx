interface DescriptionBoxProps {
    Description: string;
  
  }
  
  
  const img_address = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAADY2NgjIyPz8/NjY2O5ubn8/PwcHBzKysp7e3tsbGyFhYWSkpLNzc2goKBRUVEICAji4uLCwsKYmJjp6empqal2dnYXFxczMzOMjIywsLBWVlY5OTnk5OQrKytBQUEnJyc+Pj7X/d/fAAAE5klEQVR4nO2d63bqIBBGg+bmvWripdVj7fs/5LHt6mqFCQphYHR9+3+E3SYZ5ouGLHOgasumONZLxcvCZU4BqebjM7PaD28p/PJmH0nvk1F0v2oWUe+TQWTBMrLfhX8x/fIivqAa5vEEB3UCQaU+ogkmOEO/OUQS3KQSVGr77IJKvUYQXKcUVGrDLrhKK6hUySxYnVIbqjmv4Ti134UVp+A8td0XnJX/2DXobhic865rsD2fIl3qT9PRKg9P9dr5TzxUXIZD6g+65hrO0rwUTENSpZCx+ba1Z2OeIQ/mSJy3bmsD2nCM2JrjsHal9habI9Z4M0ZZM4zyy40QgSHWmOhjTMOP8ZdbMUnwE6gy7qShR9C4ZbgMHWsYlyHLxf6Hm1FX6Mpv1Aru2OR2mHcMO+BC+3j2SOGOuPKFdUD2dvueQDZorKE3Tuw5+12R8yzggHqxYO5EiZOG7L4DLhv1EJg9ZdcNN8SiSoWMNZIbLjoa8GAnkwDDjqAvVKwhwZBYG1/YtWEGFGFI32BPYZpwGYZ02hem8gsxNObxRZBYQ4ph9k4phujkxBjmZ0oxQKcjxjBrye+29F9FyjHseDzUO1MRZJiNSMW+M5Jk2JG+96z8ogyNfvyLul/sIMswI59qvPdSFGZohpuf9Kr80gzpyj/pMaA4w+qDUuwRH4kzzPLAsYY8w47K7x1rCDTMBqSi78wkGnYsbjxjDZGGdKxR+y1uZBrSscbRK9YQaphtKcV3nwGlGoaLNZIbdn4tkVT0iDWSG+4PLyQHcvnmUfmTG7riHGs8nKFzrPF4hq5TfEBDx29rPKChY82AYXBgCEMYGsAwODCEoXzD7t9bPIvhv9HcFT2XEm7ogZ6fwvAaGEoAhnZgKAEY2oGhBGBoB4YSgKEdGEoAhnZuGjK8OeIWkQ2nKjbGs3oYwvAaGEYAhjCEIQz5gSEMYQhDfmIbvi7ruCyN3zgxG1bxiWwoABjagaEEYGgHhhKAoR0YSgCGdmAoARjagaEEYGjnpuGgjI05BV7D+PuXGPsHIGuD4TUwjAAMYQhDGPIDQxjCEIb8xDZ8247jsjXeBIUe3w4MJQBDOzCUAAztwFACMLQDQwnA0A4MJQBDOzCUALPhppjEpTDeYY4kCobXwDACMIQhDGHIDwxhCEMY8hPb8Pm/QbsaxcbYIw89vh0YSgCGdmAoARjagaEEYGgHhhKAoR0YSgCGdp7fcKIdPWeaZR/m2hwnTkfrMYzzlskR0HclM4IcK/pWdsYL7wSgb0Y3czp6oR19YJplHw7aHN12H19rRyvjrfbJyfUpuu3M3eqHN0zz9KfRp9g6HV4N9eONFzMmptIneHacoV4uzFA9McZjBbdiYd6K3Teg58W4UTgXNONClLWu0dczzpdhZt6LlaSFjb6cUT71zDwNXCsOH3q19ryIzsTH7Nfpb6nVek/M7OzxSSXxOUqdpqNVm2AbnW/a1Wh6IudV+vyxjuRHXdgNU7HrmtLRR5C6nMXieROM/yTbF7fG6ZeKPuXlsfe+/61ST/1OjEf890MVRXn0Wk9uUs/+Dowv8T+bYu+FFl345eBV6q8Z1KklLNRBGp7c6IbFUISKj6SeqQHO0B8qPT+VwCxsn5M3VM+Sjn0TPt+s5mMpq7jTeM7Up1Zt2RTHeplMbVkfi6ZsnfT+A3kOiNNvozzFAAAAAElFTkSuQmCC"

  
  const DescriptionBox = ({Description}: DescriptionBoxProps) => {
    return(
      <div className={`flex flex-col w-176 h-auto`}> 
          <div className={`flex flex-row w-176 h-auto`}> 
              <div className={`flex items-center text-2xl`}><img src={img_address} className={`w-10 h-10 mr-3`} />Description</div>
          </div>
    
          <div className={`flex item-start flex-row w-166 text-justify text-gray-400 rounded-2xl relative mt-4 ml-10`}>
              {Description}
          </div>
      </div>
      );
    }
  
  export { DescriptionBox };
  
  