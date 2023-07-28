#   The YAML CV rendered in React

*   Used by [my gitHub Page](https://akseiya.github.io), rendering 
    [my own CV](./public/AuthorsResume.yaml).
*   Allows ephemeral editions to the content, re-rendering as needed.
    *   Currently, does it by putting the whole YAML source into a
        `<textarea>`, sorry.

## Why bother?

As a proud jumper, I update my CV relatively often. I made it a HTML document
years ago as a way to quickly detect wrong placements but fiddling with raw
HTML is a very peculiar concept for fun.

That is, firstly for my own benefit.

### Why in React?

To simplify the way I think of and process the CV data and how it gets rendered
structurally. React's tree of JSX components fits my concept of CV information
quite nicely. It also made the interactive bits rather trivial to
introduce.

Also, to show that I can use React. Recruiters often fail to realise SDET-s
are programmers. Perhaps it will help.

## The data format

As the app is intended to deal specifically with CVs, so the YAML will never be
fully free-form (also, in that case, just using Markdown would be better).

Optional sections are marked as such in [my own CV](./public/AuthorsResume.yaml)
which is also intended to touch on all features of rendering and serve as
exhaustive example.

## What does this do?

Right now, it renders a YAML CV as a web-page with a flat mode intended for
copypasting into MS Word et al - tested with LibreOffice Writer - it's not
beautiful, but it does have the right header styles in the right places.

If provided, it renders the email as a `mailto:` link (side icon).

It sorts the job history by start date.

It folds job description after three most recent positions and allows unfolding.

There is a degree of responsiveness at play. Have a go!

Importantly, it does allow the user to change the local YAML and
render possibly someone else's CV as long as it obeys the schema.

## What does it not do?

No intelligent state handling yet, which is why the hamburger pulses after
you apply the supposedly modified YAML.

This, no in-place edit with limited redraws, not yet.

No option to persist your own CV except copypasting the YAML source, storing
it somewhere else and pasting it back later.

## What do you intend to make it do sometime soon?

1.  More contact options, with phone links expected to work on smartphones.
1.  State refactor, possibly with a reducer as the hovering menu should not
    consider YAML history its state, but it does need to change it, 
    requiring a state that is not just lifted.
1.  A time zone widget for Mr Worldwides out there, telling the recruiter
    how many hours ahead/behind the candidate's time they are.
1.  Accepting a base64-encoded YAML from URL query
    * should this even work? we're talking a dozen kilobyte link here
    * or accepting a link instead and retrieving the YAML from there
1.  In-place editing of particular job descriptions etc, like most commercial
    jobseeker sites do.
1.  Photo uploader converting to properly sized and compressed format.
1.  More flexibility for free-form sections, especially the ones after
    employment history.

