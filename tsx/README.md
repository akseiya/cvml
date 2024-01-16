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

React's tree of JSX components fits my concept of CV information
quite nicely. The way it adds interactions also mostly fits my thinking quite
well.

Also, to show that I can use React. Recruiters often fail to realise SDET-s
are programmers. Perhaps it will help.

## The data format

As the app is intended to deal specifically with CVs, the YAML will never be
fully free-form (also, in that case, just using Markdown would be better).

Optional sections are marked as such in [my own CV](./public/AuthorsResume.yaml)
which is also intended to touch on all features of rendering and serve as the
exhaustive example of the schema.

## What does this do?

Right now, it renders a YAML CV as a web-page with a flat mode intended for
copy-pasting into MS Word et al - tested with LibreOffice Writer - it's not
beautiful, but it does have the right header styles in the right places.

If provided, it renders the email as a `mailto:` link (side icon).

It sorts the job history by start date and relevance - that is, up to 3 jobs
marked as `featured` will bubble up.

It hides jobs left more than about 10 years ago.

Past the first 3 most recent or featured jobs, jobs description are folded by
default, with a button to unfold each.

There is a degree of responsiveness at play. Have a go!

Importantly, it does allow the user to change the local YAML and
render possibly someone else's CV as long as it obeys the schema. The editor
is a simple `<textarea>` but it does have a undo/redo history.

## What does it not do?

No error boundaries! That is, breaking the YAML badly in the editor will
make the app render as a blank page.

Complex state management - just a couple reducers and contexts for sane
re-renders.

No option to persist your own CV except copy-pasting the YAML source, storing
it somewhere else and pasting it back later.

## Roadmap?

### Top priorities

1.  Persistence of custom YAML documents (user's CV)
    *   right now I can only think of a CSRF-allowed proxy serving a cloud
        document already made public by the user.

### Future plans

1.  More contact options, with phone links expected to work on smartphones.
1.  A time zone widget for Mr Worldwides out there, telling the recruiter
    how many hours ahead/behind the candidate's time they are.
1.  In-place editing of particular job descriptions etc, like most commercial
    jobseeker sites do.
1.  Photo uploader converting to properly sized and compressed format.
1.  More flexibility for free-form sections, especially the ones after
    employment history.

### Implemented

1.  Error boundaries to allow easy recovery from YAML problems;
    *   somewhat rudimentary and does emit the JS error;
    *   does offer two further recovery options - to correct the source YAML
        manually or to completely fall back to previously remembered state
        (which had to be valid).

1.  State refactor, possibly with a reducer as the hovering menu should not
    consider YAML history its state, but it does need to change it, 
    requiring a state that is not just lifted.
    *   Indeed, reducers and context were used, burger icon no longer pulses
        unless page is [re-]loaded.
