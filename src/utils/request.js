/* import axios from 'axios'
const request =axios.create({
    baseURL:'https://www.yiketianqi.com/free/day?appid=88344344&appsecret=fAh2sBq8',
    timeout:1000,
    headers: {'X-Custom-Header': 'foobar'}
})
export default request */
const BASE_URL = "https://www.yiketianqi.com/free/day?appid=88344344&appsecret=fAh2sBq8";
async function request(url, options = {}) {
  // const cookieValue = encodeURIComponent(
  //   "00Ox-uWGcp_CTYiK0TFlQuD99WYdjUAAAGFzhwY7A"
  // );
  options.headers = options.headers || {};
  //检查选项对象是否存在headers属性，如果不存在则创建一个空对象
  options.headers["Content-Type"] = "application/json";
  //设置选项对象的Content-Type属性为application/json，表示发送的是json格式的数据
  options.credentials = "include";
  //请求中包含凭证信息
  // options.headers["Cookie"] = `${cookieValue}`;
  options.mode = "cors";
  //使用跨域资源共享(CORS)标准来处理跨域请求。
  url = BASE_URL + url;
  //将 URL 拼接成完整的请求 URL。
  try {
    //使用 fetch 函数发送 HTTP 请求，并使用 await 等待响应结果
    const response = await fetch(url, options);
    if (!response.ok) {
      //检查响应是否为200，如果不是则抛出一个错误，http响应的状态文本，例如 "Not Found"、"Unauthorized" 等。
      throw new Error(response.statusText);
    }
    //正常情况下将响应结果解析为 JSON 格式并返回。
    return await response.json();
  } catch (error) {
    //请求过程中发生了错误（例如请求超时或网络错误），则会进入 catch 块中。
    //如果请求失败，将错误信息打印到控制台并将错误抛出。
    console.error("Request failed:", error);
    throw error;
  }
}
export default request;
//为了保证 Web 应用程序的安全性，浏览器默认情况下会阻止跨域请求，这就是跨域资源共享(CORS)标准的作用。
//为了能够在 Web 应用程序中使用跨域请求，需要在服务器端配置 CORS，以便告诉浏览器哪些跨域请求是允许的。在这段代码中，通过将 options.mode 属性设置为 "cors"，即告诉浏览器使用 CORS 标准来处理跨域请求。
//
