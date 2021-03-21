# GitHub Action - action-get-comment-url

GitHub action to get URL from Pull Request comment.

In many cases you can configure your workflow, to generate Pull Request previews. Generated preview gets unique URL, which you can visit. This action helps you to automate workflow even more, by letting you access URL from comment. With that you can run e2e tests or pass this further as a value.

## Quick start

example usages

### Vercel

```yaml
- id: get-preview-url
  uses: patzick/action-get-comment-url@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    platform: Vercel
```

### Neflify

```yaml
- id: get-preview-url
  uses: patzick/action-get-comment-url@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    platform: Vercel
```

### Passing pattern

You can pass any unique part of the comment content.

```yaml
- id: get-preview-url
  uses: patzick/action-get-comment-url@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    pattern: being automatically deployed
```

you can use that in other step like this

```yaml
- name: run cypress
  run: |
    yarn cypress run --config baseUrl=${{ steps.get-preview-url.outputs.comment_url }}
```

## Action API

### Inputs

| Parameter | Required | Description                                                                                     |
| --------- | -------- | ----------------------------------------------------------------------------------------------- |
| token     | true     | Required for action to run, just pass `${{ secrets.GITHUB_TOKEN }}`                             |
| platform  | false    | Preconfigured settings for platforms. Available values: `vercel`, `netflify`, `storefrontcloud` |
| pattern   | false    | [ignored when `platform` provided] Search for comment with this pattern to extract URL          |
| index     | false    | [ignored when `platform` provided] Which URL in commit should be returned. The default is 1.    |

`pattern` param by default will return url from the first comment with a link (which probably is not what you need)

### Outputs

| Parameter   | Type    | Description                                            |
| ----------- | ------- | ------------------------------------------------------ |
| comment_url | string  | URL from the first comment, which matches the criteria |
| found_url   | boolean | value indicating whether URL was found                 |

You can access output values, by reaching for step id. If you use this action with id `get-preview-url` you can access it

```
${{ steps.get-preview-url.outputs.comment_url }}
```
