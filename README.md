# GitHub Action - action-get-comment-url

GitHub action to get URL from Pull Request comment.

In many cases you can configure your workflow, to generate Pull Request previews. Generated preview gets unique URL, which you can visit. This action helps you to automate workflow even more, by letting you access URL from comment. With that you can run e2e tests or pass this further as a value.

## Quick start

example usage

```yaml
- id: get-preview-url
  uses: patzick/action-get-comment-url@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    pattern: This pull request is being automatically deployed with Vercel
```

you can use that in other step like this

```yaml
- name: run cypress
  run: |
    yarn cypress run --config baseUrl=${{ steps.get-preview-url.outputs.comment_url }}
```

## Action API

### Inputs

| Parameter | Required | Description                                                         |
| --------- | -------- | ------------------------------------------------------------------- |
| token     | true     | Required for action to run, just pass `${{ secrets.GITHUB_TOKEN }}` |
| pattern   | false    | Search for comment with this pattern to extract URL                 |

`pattern` param by default will return url from the first comment with a link (which probably is not what you need)

### Outputs

| Parameter   | Description                                            |
| ----------- | ------------------------------------------------------ |
| comment_url | URL from the first comment, which matches the criteria |
