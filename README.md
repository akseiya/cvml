# CV YAML

Intent: stop fiddling with raw HTML when updating the resume.

Current Big Idea: [use React](.tsx), see if this can work without
a backend.

# The PLN

1.  Define a YAML structure reasonably representing a CV
1.  Capture my own resume as such and render it as HTML
1.  Allow creation of a structured CV like most recruitment portals do
    (HTML forms) and encoding them back as YAML (base64? for copypasting)
1.  Export as DOC, PDF.
1.  Hooks mapping to popular recruitment portal's CV creation forms, puppetter them with a webdriver.