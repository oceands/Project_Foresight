import re

def validate_ip(ip):
    """
    Validate an IPv4 address using a regular expression.

    Args:
        ip (str): IPv4 address to validate.

    Returns:
        bool: True if the IP address is valid, False otherwise.
    """
    ip_regex = r'^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.'
    ip_regex += r'(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.'
    ip_regex += r'(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.'
    ip_regex += r'(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$'

    return bool(re.match(ip_regex, ip))


def validate_mac(mac):
    """
    Validate a MAC address using a regular expression.

    Args:
        mac (str): MAC address to validate.

    Returns:
        bool: True if the MAC address is valid, False otherwise.
    """
    mac_regex = r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$'

    return bool(re.match(mac_regex, mac))

