import mastodoninterface


def main():
    mastodon_instance = mastodoninterface.MastodonInterface()
    mastodon_instance.mastodon.toot('test toot')

if __name__ == '__main__':
    main()