page = require('webpage').create()
args = require('system').args

company = args[1] || 'att'
# if not args[1]
#   console.log "Company required as first argument"
#   phantom.exit()

# console.log "I'm feeling lucky search for #{company}..."
page.open "http://www.google.com/search?q=#{company}&btnI", (status) ->
  if status is 'fail'
    console.log "Failed to find url for #{company}"
  else
    # console.log "Base url found: #{page.url}, getting favicon..."
    url = page.url.match(/https?:\/\/\w+.\w+.\w+\//)
    favicon = url + "favicon.ico"

    console.log JSON.stringify({url: favicon})
    phantom.exit()
