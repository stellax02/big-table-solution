Q slice-starter

This repository will serve as a starting point in creating projects which will require slicing from scratch.

Starter documentation contents:

**[Folder structure](#folder-structure)**<br>
**[Styles specific structure](#styles-specific-structure)**<br>
**[Naming convention](#naming-convention)**<br>
**[Js helpers and components](#js-helpers-and-components)**<br>
**[Webpack bundler](#webpack-bundler)**<br>

## Folder structure

Folder and mandatory project files structure:

    - src
        - assets
            - audio
            - fonts
            - icons
            - images
            - videos
        - js
        - scss (details covered in Styles specific structure)
            - base
            - components
            - elements
            - layout
            - pages
            - sections
            - utilities
            - vendors
        - index.js
        - style.scss
    - .gitignore
    - index.html
    - package-lock.json
    - package.json
    - README.md
    - webpack.common.js
    - webpack.dev.js
    - webpack.prod.js

## Styles specific structure

Scss folders are structured with files

**base** folder implements the first process the developer should do at the start of development

It contains the following files (files are recommended to be adapted in the order specified by prefix number):

    - 1-reset.scss
    - 2-fonts.scss
    - 3-colors.scss
    - 4-z_indexes.scss
    - 5-breakpoints.scss
    - 6-layout-grid.scss
    - 7-containers.scss
    - 8-mixins.scss

1-reset.scss => No need for editing this file

2-fonts.scss => Import font-faces and define semantic font variables

3-colors.scss => Define semantic color variables

4-z_indexes.scss => Define variables for z_indexes of major app layer components (header,modal etc)

5-breakpoints.scss => Define breakpoint variables (coordinate with the designer if possible)

6-layout-grid.scss => Define designer grid values (columns and gaps)

7-containers.scss => Define variables for content containers (can use designer grid values if the values are usable and whole numbers)

8-mixins.scss => A list of agreed mixins to be used - if needed, additional mixins can be added

## Naming convention

Naming convention is base on BEM and ITCSS methodologies.
Mainly BEM is extended via 3 steps:

    BEM format example

    block
    block__element
    block--modifier

    ITCSS format example

    o-object
    c-component
    u-utilities

**Extension 1** - optional grandchild selector class (!! only used when we want to reflect the HTML markup for specific child element)

    block
    block__child
    block__child_grandchild   *one lodash used for better understanding inside nested scss files
    block--modifier

**Extension 2** - prefixes as inspired by ITCSS methodology. All prefixes are prefixes of existing folder names:

    e-elementClass   (elements folder)
    c-componentClass (components folder)
    l-layoutClass    (layout folder)
    s-sectionClass   (sections folder)
    u-utilities      (utilities folder)

    Current result example:

    c-block                     (c marks component, block marks block class)
    c-block__element            (c marks component, block marks class, element marks class extension for child element)
    c-block--modifier           (c marks component, block marks class, modifier marks class extension for modifier)

**Extension 3** - special prefix added for complicated components that need a subcomponent

    sc-subcomponent

    Standard BEM example:

    c-block__element
        c-block__element
            c-block__element
            ... and so on

    Current result example:

    c-block__element
        c-block__element
            sc-block
                sc-block__element sc-block__element--modifier

subcomponent scss is written at root level of parent component scss:

    .c-parent{
        &__child{

        }
        &__child{

        }
        &__child{

        }

        .sc-subcomponent{
            &__child{

            }
        }
    }

Nomenclature notes:

We write classes with camelCase -> c-bigComponent\_\_componentBlock

## Npm commands

npm run dev -> local dev server with watcher and browsersync
npm run build -> build for static site or test site
npm run build:prod -> build for production
