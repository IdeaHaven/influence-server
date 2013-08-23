page = require('webpage').create()
args = require('system').args

company = args[1]
if not args[1]
  console.log "Company required as first argument."
  phantom.exit()

# console.log "I'm feeling lucky search for #{company}..."
page.open "http://www.google.com/search?q=#{company}&btnI", (status) ->
  unless status is 'success'
    console.log "Failed to find url for #{company}"
  else
    # console.log "Base url found: #{page.url}, getting favicon..."
    page.injectJs 'phantom-jquery.js'
    favicon = page.evaluate ->
      return $("link[rel='shortcut icon']").attr('href')
    url = page.url.match(/(https?:\/\/\w+.\w+.\w+)\//)[1]
    # console.log favicon
    unless favicon.match(/http/)
      favicon = favicon || "/favicon.ico"
      favicon = url + favicon
    console.log JSON.stringify({url: favicon})
    phantom.exit()
