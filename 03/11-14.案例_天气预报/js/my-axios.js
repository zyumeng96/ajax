    function myAxios({url, method, params, data}) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        if (params) {
          const paramsObj = new URLSearchParams(params)
          const queryString = paramsObj.toString()
          url += `?${queryString}`
        }
        xhr.open(method || 'GET', url)

        xhr.addEventListener('loadend', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(new Error(xhr.response))
          }
        })
        if (data) {
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify(data))
        } else {
          xhr.send()
        }
      })
    }