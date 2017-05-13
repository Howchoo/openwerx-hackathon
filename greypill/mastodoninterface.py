import util
from mastodon import Mastodon


class MastodonInterface:
    """Interface for pulling data from Mastodon network"""

    mastodon = None
    client_name = None
    email = None
    password = None

    def __init__(self):
        self.__initialize_environment_variables()

        try:
            Mastodon.create_app(
                self.client_name,
                to_file='clientcred.secret'
            )

            self.mastodon = Mastodon(client_id='clientcred.secret')

            self.mastodon.log_in(
                self.email,
                self.password,
                to_file='pytooter_usercred.secret'
            )
        except Exception as e:
            print e

    def __initialize_environment_variables(self):
        self.client_name = util.get_config_value('mastodonClientName')
        self.email = util.get_config_value('mastodonEmail')
        self.password = util.get_config_value('mastodonPassword')

if __name__ == '__main__':
    mastodon_instance = MastodonInterface()