import util
import requests
from mastodon import Mastodon
from mastodon.streaming import StreamListener


class MastodonInterface:
    """Interface for pulling data from Mastodon network"""

    mastodon = None
    client_name = None
    email = None
    password = None
    listener = None

    def __init__(self):
        self.__initialize_environment_variables()
        
        self.listener = Listener()

        try:
            Mastodon.create_app(
                self.client_name,
                to_file='clientcred.secret'
            )

            self.mastodon = Mastodon(client_id='clientcred.secret')

            self.mastodon.log_in(
                self.email,
                self.password,
                to_file='usercred.secret'
            )
        except Exception as e:
            raise
        
        print self.mastodon.public_stream(self.listener).next()

    def __initialize_environment_variables(self):
        self.client_name = util.get_config_value('mastodonClientName')
        self.email = util.get_config_value('mastodonEmail')
        self.password = util.get_config_value('mastodonPassword')
        
class Listener(StreamListener):

    def on_update(self, status):
        requests.post('http://localhost:5000/mastodonfeed', json = status)

if __name__ == '__main__':
    mastodon_instance = MastodonInterface()