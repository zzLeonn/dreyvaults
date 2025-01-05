# Contributing to Drey's Vault

First off, thank you for considering contributing to Drey's Vault. It's people like you that make Drey's Vault such a great tool.

## Getting Started

* Make sure you have a [GitHub account](https://github.com/signup/free)
* Submit a ticket for your issue, assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.

## Making Changes

* Fork the repository on GitHub.
* Create a topic branch from where you want to base your work.
  * This is usually the main branch.
  * Only target release branches if you are certain your fix must be on that branch.
  * To quickly create a topic branch based on main, run `git checkout -b fix/my_contribution main`. Please avoid working directly on the `main` branch.
* Make commits of logical and atomic units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure your commit messages are in the proper format.
* Make sure you have added the necessary tests for your changes.
* Run all the tests to assure nothing else was accidentally broken.

## Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the repository in the Drey's Vault organization.
* The core team looks at Pull Requests on a regular basis and will provide feedback.
* After feedback has been given we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity.

## Coding Conventions

Start reading our code and you'll get the hang of it. We optimize for readability:

* We indent using two spaces (soft tabs)
* We use HAML for all views
* We avoid logic in views, putting HTML generators into helpers
* We ALWAYS put spaces after list items and method parameters (`[1, 2, 3]`, not `[1,2,3]`), around operators (`x += 1`, not `x+=1`), and around hash arrows.
* This is open source software. Consider the people who will read your code, and make it look nice for them. It's sort of like driving a car: Perhaps you love doing donuts when you're alone, but with passengers the goal is to make the ride as smooth as possible.

## Additional Resources

* [General GitHub documentation](https://help.github.com/)
* [GitHub pull request documentation](https://help.github.com/articles/about-pull-requests/)
* [Code of Conduct](CODE_OF_CONDUCT.md)

## Questions?

Don't hesitate to contact the Drey's Vault core team if you have any questions or concerns.
