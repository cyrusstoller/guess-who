## Learn some names!

This is a simple game that allows you to guess the names of people.

This is a fork of https://github.com/cyrusstoller/guess-the-stack

### For development

```bash
$ shotgun config.ru
```

### For production

```bash
$ rackup config.ru
```

## Database schema

The sqlite file should live in

> data/people.sqlite3.db

```sql
CREATE TABLE "people" (
	`id`			INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`			TEXT,
	`web_url`		TEXT,
	`description`	TEXT,
	`thumbnail`		TEXT
);
```

## Contributing

### Bugs / Issues

If you find a bug or something that could improve the user experience, please file an issue on this github project, so contributors/maintainers can get started fixing them. :-)

Even if you plan on filing a patch for the issue yourself it'd be great if you could still file an issue so that we don't have people duplicating work unnecessarily.

### Submitting Pull Requests

1. Fork this project
2. Make a feature branch git checkout -b feature
3. Make your changes and commit them to your feature branch
4. Submit a pull request